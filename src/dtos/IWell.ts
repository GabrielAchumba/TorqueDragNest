import { Guid } from "../models/guid";
import { TorqueDragDesignWithGuid } from "../models/torquedragdesign";
import { IWellbore, Wellbore } from "./IWellbore";

export interface IWell
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    siteName:string;
    label:string;
    avatar:string;
    icon:string;
    children:IWellbore[];

    GetWellbores(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
}



export const Well:IWell = 
{
    id:"",
    externalcompanyName:"",
    projectName: "",
    siteName: "",
    label: "",
    avatar: "",
    icon: "",
    children:[],

    GetWellbores(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nwellboreNames:number = wellDesignDTO.wellbores.length;
        const ntorqueDragDesigns:number = torqueDragDesigns.length;

        for (i = 0; i < nwellboreNames; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (torqueDragDesigns[j].externalcompanyName == this.externalcompanyName &&
                    torqueDragDesigns[j].projectName == this.projectName &&
                    torqueDragDesigns[j].siteName == this.siteName &&
                    torqueDragDesigns[j].wellName == this.label &&
                    torqueDragDesigns[j].wellboreName == wellDesignDTO.wellbores[i])
                {
                    let wellbore = {...Wellbore} as IWellbore;
                    
                    wellbore.id = Guid.NewGuid(),
                    wellbore.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    wellbore.projectName = torqueDragDesigns[j].projectName;
                    wellbore.siteName = torqueDragDesigns[j].siteName;
                    wellbore.wellName = torqueDragDesigns[j].wellName;
                    wellbore.label = torqueDragDesigns[j].wellboreName;
                    wellbore.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                    wellbore.icon = "folder";
                    wellbore.children = [];
                    

                    wellbore.GetWellDesigns(wellDesignDTO, torqueDragDesigns);
                    this.children.push(wellbore);
                    break;
                }
            }
        }
    }
}