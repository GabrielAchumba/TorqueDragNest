import { Guid } from "../models/guid";
import { TorqueDragDesignWithGuid } from "../models/torquedragdesign";
import { ISite, Site } from "./ISite";

export interface IProject
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    label:string;
    avatar:string;
    icon:string;
    children: ISite[];

    GetSites(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void;

}


export const Project: IProject =
{
    id: "",
    externalcompanyName: "",
    projectName: "",
    label: "",
    avatar: "",
    icon: "",
    children: [],

    GetSites(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nSites:number = wellDesignDTO.sites.length;
        const ntorqueDragDesigns:number = torqueDragDesigns.length;

        for (i = 0; i < nSites; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (torqueDragDesigns[j].externalcompanyName == this.externalcompanyName &&
                    torqueDragDesigns[j].projectName == this.label &&
                    torqueDragDesigns[j].siteName == wellDesignDTO.sites[i])
                {
                    let site = {...Site} as ISite;
                    
                    site.id = Guid.NewGuid(),
                    site.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    site.projectName = torqueDragDesigns[j].projectName;
                    site.label = torqueDragDesigns[j].siteName;
                    site.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                    site.icon = "folder";
                    site.children = [];
                    

                    site.GetWells(wellDesignDTO, torqueDragDesigns);
                    this.children.push(site);
                    break;
                }
            }
        }
    }

}