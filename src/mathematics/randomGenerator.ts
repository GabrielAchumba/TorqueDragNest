export const RandomGenerator = {

    random(lb:number, ub:number):number{
        const rnd:number= Math.random();
        const x:number = lb + (ub - lb) *  rnd;
        return x;
    }
}