export type CalcStatus = "Verified" | "Field Estimate" | "Estimated Range" | "Partial";

export function specificGravityFromApi(api: number) {
  return 141.5 / (api + 131.5);
}

export function density60KgM3FromApi(api: number) {
  return specificGravityFromApi(api) * 999.016;
}

// Generalized crude oil temperature correction relationship used for field estimation.
export function ctlFromApi(api60: number, tempF: number) {
  const rho60 = density60KgM3FromApi(api60);
  const alpha = 341.0957 / (rho60 * rho60);
  const deltaT = tempF - 60;
  return Math.exp(-alpha * deltaT * (1 + 0.8 * alpha * deltaT));
}

export function correctObservedApiTo60(observedApi: number, observedTempF: number) {
  const observedDensity = specificGravityFromApi(observedApi) * 999.016;
  let low = 500;
  let high = 1100;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const sg60 = mid / 999.016;
    const api60 = 141.5 / sg60 - 131.5;
    const predictedAtTemp = mid * ctlFromApi(api60, observedTempF);
    if (predictedAtTemp > observedDensity) high = mid;
    else low = mid;
  }
  const rho60 = (low + high) / 2;
  return 141.5 / (rho60 / 999.016) - 131.5;
}

// Apparent pounds per gallon in air at 60 F, based on API gravity at 60 F.
export function poundsPerGallonAir(api60: number) {
  return (141.381957 / (api60 + 131.5) - 0.001199407795) * 8.345404452;
}

export function estimateTemperatureRange(api60: number, heated?: boolean) {
  if (heated === false && api60 >= 25) return [80, 105] as const;
  if (api60 < 14) return [160, 180] as const;
  if (api60 < 18) return [140, 180] as const;
  if (api60 < 22) return [120, 160] as const;
  if (api60 < 25) return [95, 140] as const;
  return [80, 105] as const;
}

export function calculateLact(args: {
  meterStart: number;
  meterStop: number;
  meterFactor: number;
  api60: number;
  bswPercent?: number | null;
  flowingTempF?: number | null;
  cpl?: number | null;
}) {
  const indicated = args.meterStop - args.meterStart;
  const mf = Number.isFinite(args.meterFactor) ? args.meterFactor : 1;
  const meterCorrected = indicated * mf;
  const ctl = args.flowingTempF == null ? null : ctlFromApi(args.api60, args.flowingTempF);
  const cpl = args.cpl == null ? 1 : args.cpl;
  const gsv = ctl == null ? null : meterCorrected * ctl * cpl;
  const bsw = args.bswPercent == null ? null : args.bswPercent / 100;
  const nsv = gsv == null || bsw == null ? null : gsv * (1 - bsw);
  return { indicated, meterCorrected, ctl, cpl, gsv, nsv };
}

export function calculateTruckScale(args: {
  heavyLb: number;
  lightLb: number;
  api60: number;
  bswPercent?: number | null;
}) {
  const netWeightLb = args.heavyLb - args.lightLb;
  const lbPerGal = poundsPerGallonAir(args.api60);
  const gallons = netWeightLb / lbPerGal;
  const gsv = gallons / 42;
  const bsw = args.bswPercent == null ? null : args.bswPercent / 100;
  const nsv = bsw == null ? null : gsv * (1 - bsw);
  return { netWeightLb, lbPerGal, gallons, gsv, nsv };
}
