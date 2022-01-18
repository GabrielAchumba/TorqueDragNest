import { Guid } from "src/models/guid";
import { TorqueDragDesignWithGuid } from "src/models/torquedragdesign";
import { IWellDesign, WellDesign } from "./IWellDesign";

export interface IWellbore
{
    id:string;
    projectName:string;
    externalcompanyName:string;
    siteName:string;
    wellName:string;
    label:string;
    avatar:string;
    icon:string;
    children:IWellDesign[];

    GetWellDesigns(wellDesignDTO:any,
         torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
    
}


export const Wellbore: IWellbore = 
{
    id: "",
    projectName: "",
    externalcompanyName: "",
    siteName: "",
    wellName: "",
    label: "",
    avatar: "",
    icon: "",
    children: [],

    GetWellDesigns(wellDesignDTO:any,
         torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nwellDesignNames:number = wellDesignDTO.wellDesigns.length;
        const ntorqueDragDesigns:number = torqueDragDesigns.length;

        for (i = 0; i < nwellDesignNames; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (torqueDragDesigns[j].externalcompanyName == this.externalcompanyName &&
                    torqueDragDesigns[j].projectName == this.projectName &&
                    torqueDragDesigns[j].siteName == this.siteName &&
                    torqueDragDesigns[j].wellName == this.wellName &&
                    torqueDragDesigns[j].wellboreName == this.label &&
                    torqueDragDesigns[j].wellDesignName == wellDesignDTO.wellDesigns[i])
                {
                    let wellDesign = {...WellDesign} as IWellDesign;
                    wellDesign.id = Guid.NewGuid();
                    wellDesign.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    wellDesign.projectName = torqueDragDesigns[j].projectName;
                    wellDesign.siteName = torqueDragDesigns[j].siteName;
                    wellDesign.wellName = torqueDragDesigns[j].wellName;
                    wellDesign.wellboreName = torqueDragDesigns[j].wellboreName;
                    wellDesign.label = torqueDragDesigns[j].wellDesignName;
                    wellDesign.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                    wellDesign.icon = "folder";
                    wellDesign.children = [];

                    wellDesign.GetWellCases(wellDesignDTO, torqueDragDesigns);
                    this.children.push(wellDesign);
                    break;
                }
            }
        }
    }
}