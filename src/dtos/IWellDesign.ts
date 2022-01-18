import { TorqueDragDesignWithGuid } from "src/models/torquedragdesign";
import { IWellCase, WellCase } from "./IWellCase";

export interface IWellDesign
{
    id:string;
    projectName:string;
    externalcompanyName:string;
    siteName:string;
    wellName:string;
    wellboreName:string;
    label:string
    avatar:string;
    icon:string;
    children:IWellCase[];
    
    GetWellCases( wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
}

export const WellDesign: IWellDesign = 
{
    id:"",
    projectName:"",
    externalcompanyName:"",
    siteName: "",
    wellName: "",
    wellboreName: "",
    label: "",
    avatar: "",
    icon: "",
    children:[],

    GetWellCases(wellDesignDTO:any,
         torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nwellCases:number = wellDesignDTO.wellCases.length;
        const ntorqueDragDesigns:number = torqueDragDesigns.length;

        for (i = 0; i < nwellCases; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (torqueDragDesigns[j].externalcompanyName == this.externalcompanyName &&
                    torqueDragDesigns[j].projectName == this.projectName &&
                    torqueDragDesigns[j].siteName == this.siteName &&
                    torqueDragDesigns[j].wellName == this.wellName &&
                    torqueDragDesigns[j].wellboreName == this.wellboreName &&
                    torqueDragDesigns[j].wellDesignName == this.label &&
                    torqueDragDesigns[j].designName == wellDesignDTO.wellCases[i])
                {
                    let entryDate:Date = new Date();

                    if (torqueDragDesigns[j].designDay > 0 && torqueDragDesigns[j].designMonth > 0 && torqueDragDesigns[j].designYear > 0)
                    {
                        entryDate = new Date(torqueDragDesigns[j].designYear,
                            torqueDragDesigns[j].designMonth,
                            torqueDragDesigns[j].designDay);
                    }

                    let wellCase = {...WellCase} as IWellCase;
            
                    wellCase.id = torqueDragDesigns[j].wellCaseId;
                    wellCase.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    wellCase.projectName = torqueDragDesigns[j].projectName;
                    wellCase.siteName = torqueDragDesigns[j].siteName;
                    wellCase.wellName = torqueDragDesigns[j].wellName;
                    wellCase.wellboreName = torqueDragDesigns[j].wellboreName;
                    wellCase.wellDesignName = torqueDragDesigns[j].wellDesignName;
                    wellCase.label = torqueDragDesigns[j].designName;
                    wellCase.companyName = torqueDragDesigns[j].companyName;
                    wellCase.designName = torqueDragDesigns[j].designName;
                    wellCase.creationDate = entryDate.toLocaleString();
                    wellCase.designId = torqueDragDesigns[j].id;
                    wellCase.icon = "folder";
                    wellCase.isSelected = false;

                    this.children.push(wellCase);
                    break;
                }
            }
        }
    }
}