export const Spacing = {

    LineSpace(start:number, end:number, interval:number):number[]{
        let ans:number[] = [];
        let x:number = start;
        ans.push(start);

        while (x < end)
        {
            x += interval;
            ans.push(x);
        }

        const i:number = ans.length - 1;

        if (ans[i] != end)
            ans[i] = end;

        return ans;
    },

    LineSpace2(start:number, end:number, nth:number): number[]
    {
        let ans:number[] = [];
        const interval:number = (end - start)/(nth - 1);
        let i:number = 0;
        for (i = 0; i < nth; i++)
        {
            ans.push(start + i* interval);
        }

        return ans;
    },

    LineSpaceReverse(start:number, end:number, interval:number): number[]{
        let ans:number[] = [];
        let x:number = end;
        ans.push(end);

        while (x > start)
        {
            x -= interval;
            ans.push(x);
        }

        const i:number = ans.length - 1;
        if (ans[i] > start)
            ans.push(start);

        if (ans[i] < start)
            ans[i] = start;

        return ans;
    }


}