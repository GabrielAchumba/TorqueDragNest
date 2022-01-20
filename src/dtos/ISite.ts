import { Guid } from "../models/guid";
import { TorqueDragDesignWithGuid } from "../models/torquedragdesign";
import { IWell, Well } from "./IWell";

export interface ISite
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    siteName:string;
    label:string;
    avatar:string;
    icon:string;
    children:IWell[];

    GetWells(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
}


export const Site: ISite = 
{
    id: "",
    externalcompanyName: "",
    projectName: "",
    siteName: "",
    label: "",
    avatar: "",
    icon: "",
    children: [],

    GetWells(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nWells:number = wellDesignDTO.wells.length;
        const ntorqueDragDesigns:number = torqueDragDesigns.length;

        for (i = 0; i < nWells; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (torqueDragDesigns[j].externalcompanyName == this.externalcompanyName &&
                    torqueDragDesigns[j].projectName == this.projectName &&
                    torqueDragDesigns[j].siteName == this.label &&
                    torqueDragDesigns[j].wellName == wellDesignDTO.wells[i])
                {
                    let well = {...Well} as IWell;
                    
                    well.id = Guid.NewGuid(),
                    well.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    well.projectName = torqueDragDesigns[j].projectName;
                    well.siteName = torqueDragDesigns[j].siteName;
                    well.label = torqueDragDesigns[j].wellName;
                    well.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                    well.icon = "folder";
                    well.children = [];
                    

                    well.GetWellbores(wellDesignDTO, torqueDragDesigns);
                    this.children.push(well);
                    break;
                }
            }
        }
    }
}