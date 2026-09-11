function sg(api){return 141.5/(api+131.5)}
function rho(api){return sg(api)*999.016}
function ctl(api,t){const r=rho(api);const a=341.0957/(r*r);const d=t-60;return Math.exp(-a*d*(1+.8*a*d))}
function correct(obs,temp){const target=sg(obs)*999.016;let lo=500,hi=1100;for(let i=0;i<100;i++){const mid=(lo+hi)/2;const a=141.5/(mid/999.016)-131.5;const pred=mid*ctl(a,temp);if(pred>target)hi=mid;else lo=mid}const r=(lo+hi)/2;return 141.5/(r/999.016)-131.5}
function ppg(api){return (141.381957/(api+131.5)-.001199407795)*8.345404452}
function close(actual,expected,tol,label){if(Math.abs(actual-expected)>tol){console.error(label,actual,'expected',expected);process.exitCode=1}else console.log('PASS',label,actual.toFixed(4))}
const api=correct(38.2,97);close(api,35.21,.02,'Observed gravity correction');
const gsv=170*ctl(api,97);const nsv=gsv*(1-.0002);close(gsv,167.00,.03,'LACT test 1 GSV');close(nsv,166.97,.03,'LACT test 1 NSV');
const truck=52500/ppg(api)/42;close(truck,176.86,.05,'Truck test 1 GSV');close(truck*(1-.0002),176.83,.05,'Truck test 1 NSV');
const truck2=52185/ppg(16.4)/42;close(truck2,155.94,.05,'Truck test 2 GSV');close(truck2*(1-.012),154.07,.05,'Truck test 2 NSV');
const gsv160=160*ctl(16.4,160);close(gsv160,153.964,.03,'Heavy crude 160F GSV');close(gsv160*(1-.012),152.117,.03,'Heavy crude 160F NSV');
if(!process.exitCode) console.log('All Copperhead measurement benchmarks passed.');
