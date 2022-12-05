export const NewtonianViscosity = {
    PlasticViscosity(fannDialReading:number, fannRPM:number){
        const muN:number = 300 * fannDialReading / fannRPM;
        return muN;
    }
}