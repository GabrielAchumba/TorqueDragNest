import { Guid } from "../models/guid";
import { TorqueDragDesign, TorqueDragDesignDocument, TorqueDragDesignWithGuid } from "../models/torquedragdesign";
import { CommonDTO } from "./commonDTO";
import { ExternalCompany, IExternalCompany } from "./IExternalCompany";


export class TorqueDragDesignDTO extends CommonDTO {

    torqueDragDesign:TorqueDragDesign
    info:string;
}


export interface IWellDesignDTO
{
    
    Companies:IExternalCompany[];
    torqueDragDesigns:TorqueDragDesignWithGuid[];
    torqueDragMostRecentDesigns:TorqueDragDesignWithGuid[];
    wellCaseId:string;
    externalcompanyName:string;
    projectName:string;
    externalcompanyNames:string[];
    projects:string[];
    sites:string[];
    wells:string[];
    wellbores:string[];
    wellDesigns:string[];
    wellCases:string[];

    GetMostRecntWellCases(_sortedWellCases:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid[];

    GetMostRecntWellCases2():void;

    GetLatesttWellCase(uniqueIds:string[]):TorqueDragDesignWithGuid;

    GetCompanies(_torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
}

export const WellDesignDTO: IWellDesignDTO =
{
    Companies: [],
    torqueDragDesigns: [],
    torqueDragMostRecentDesigns: [],
    wellCaseId: "",
    externalcompanyName: "",
    projectName: "",
    externalcompanyNames: [],
    projects: [],
    sites: [],
    wells: [],
    wellbores: [],
    wellDesigns: [],
    wellCases: [],

    GetMostRecntWellCases(_sortedWellCases:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid[]
    {

        let sortedWellCases:TorqueDragDesignWithGuid[] = _sortedWellCases.map((row) => {
            return row;
        })
        let i:number = 0, j:number = 0; const nCount:number = sortedWellCases.length;
        const nRecent:number = 7;
        if (nCount <= nRecent)
        {
            this.torqueDragMostRecentDesigns = sortedWellCases.map((row:TorqueDragDesignWithGuid) => {
                return row;
            })
            return;
        }

        this.torqueDragMostRecentDesigns = [];

        for (i = 0; i < nRecent; i++)
        {
            sortedWellCases[i].isSelected = false;
            sortedWellCases[i].createdAt = sortedWellCases[i].designDate.toLocaleDateString();
            this.torqueDragMostRecentDesigns.push(sortedWellCases[i]);
        }

        return sortedWellCases;
    },

    GetMostRecntWellCases2():void
    {

        let i:number = 0, j:number = 0; const nCount:number = this.torqueDragDesigns.length;
        const nRecent:number = 3;
        if (nCount <= nRecent)
        {
            this.torqueDragMostRecentDesigns = this.torqueDragDesigns.map((row:TorqueDragDesignWithGuid) => {
                return row;
            })
            return;
        }

        let uniqueIds:string[] = [];

        this.torqueDragMostRecentDesigns = [];
        for (j = 0; j < nRecent; j++)
        {
            const torqueDragDesignWithGuid:TorqueDragDesignWithGuid = this.GetLatesttWellCase(uniqueIds);
            uniqueIds.push(torqueDragDesignWithGuid.uniqueId);
            this.torqueDragMostRecentDesigns.push(torqueDragDesignWithGuid);
        }

    },

    GetLatesttWellCase(uniqueIds:string[]):TorqueDragDesignWithGuid
    {
        let i:number = 0; const nCount:number = this.torqueDragDesigns.length;
        let torqueDragDesignWithGuid:TorqueDragDesignWithGuid = this.torqueDragDesigns[0];
        let dateX:Date = torqueDragDesignWithGuid.designDate;
        for (i = 1; i < nCount; i++)
        {
            const date:Date = this.torqueDragDesigns[i].designDate;
            if (date < dateX && uniqueIds.length == 0)
            {
                torqueDragDesignWithGuid = this.torqueDragDesigns[i];
            }
            else if (date < dateX && uniqueIds.length > 0)
            {
                if (uniqueIds.includes(this.torqueDragDesigns[i].uniqueId) == false)
                    torqueDragDesignWithGuid = this.torqueDragDesigns[i];
            }
        }

        torqueDragDesignWithGuid.createdAt = torqueDragDesignWithGuid.designDate.toLocaleDateString();
        return torqueDragDesignWithGuid;
    },

    GetCompanies(_torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nCompanies:number = this.externalcompanyNames.length;
        this.torqueDragDesigns = _torqueDragDesigns.map((row:TorqueDragDesignWithGuid) => {
            return row;
        })

        console.log('(3) this.torqueDragDesigns: ', this.torqueDragDesigns);

        const ntorqueDragDesigns:number = this.torqueDragDesigns.length;


        for (i = 0; i < nCompanies; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (this.torqueDragDesigns[j].externalcompanyName == this.externalcompanyNames[i])
                {
                    let externalCompany = ExternalCompany as IExternalCompany;
                    
                    externalCompany.id = Guid.NewGuid();
                    externalCompany.label = this.torqueDragDesigns[j].externalcompanyName;
                    externalCompany.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                    externalCompany.icon = "folder";
                    externalCompany.children = [];
                    

                    externalCompany.GetProjects(this, this.torqueDragDesigns);
                    this.Companies.push(externalCompany);
                    break;
                }
            }
        }

        console.log('(3) this.torqueDragDesigns: ', this.torqueDragDesigns);
    }
}





