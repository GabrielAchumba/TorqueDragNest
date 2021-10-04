import { Guid } from "src/models/guid";
import { TorqueDragDesign, TorqueDragDesignDocument, TorqueDragDesignWithGuid } from "src/models/torquedragdesign";
import { CommonDTO } from "./commonDTO";

export class TorqueDragDesignDTO extends CommonDTO {

    torqueDragDesign:TorqueDragDesignDocument;
    info:string;
}


export class WellDesignDTO
{
    constructor() {
        this.Companies = [];
    }
    
    Companies:ExternalCompany[];
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

    public GetMostRecntWellCases(_sortedWellCases:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid[]
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
    }

    private GetMostRecntWellCases2():void
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

    }

    private GetLatesttWellCase(uniqueIds:string[]):TorqueDragDesignWithGuid
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
    }

    public  GetCompanies(_torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        let i:number, j:number;
        const nCompanies:number = this.externalcompanyNames.length;
        this.torqueDragDesigns = _torqueDragDesigns.map((row:TorqueDragDesignWithGuid) => {
            return row;
        })

        const ntorqueDragDesigns:number = this.torqueDragDesigns.length;


        for (i = 0; i < nCompanies; i++)
        {
            for (j = 0; j < ntorqueDragDesigns; j++)
            {

                if (this.torqueDragDesigns[j].externalcompanyName == this.externalcompanyNames[i])
                {
                    let externalCompany:ExternalCompany = new ExternalCompany();
                    
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
    }
}

export class ExternalCompany
{
    id:string;
    externalcompanyName:string;
    label:string;
    avatar:string;
    icon:string;
    children:Project[];

    public GetProjects(wellDesignDTO:WellDesignDTO,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void
    {
        const companyTDDs = torqueDragDesigns.filter((x:TorqueDragDesignWithGuid)  => {

            if(x.externalcompanyName == this.label){
                return x;
            }
        });

       /*  numbers.forEach((number, index) => {
            console.log('Index: ' + index + ' Value: ' + number);
        }); */

        wellDesignDTO.projects.forEach((projectName:string) =>
        {
            var tdd = companyTDDs.find(x => x.projectName == projectName);
            if (tdd != null)
            {
                let project:Project = new Project();
                
                project.id = Guid.NewGuid();
                project.externalcompanyName = tdd.externalcompanyName;
                project.label = tdd.projectName;
                project.avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
                project.icon = "folder";
                project.children = [];
                

                project.GetSites(wellDesignDTO, torqueDragDesigns);
                this.children.push(project);
            }
        })
    }
}

export class Project
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    label:string;
    avatar:string;
    icon:string;
    children:Site[];

    public GetSites(wellDesignDTO:WellDesignDTO,
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
                    let site:Site = new Site();
                    
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

export class Site
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    siteName:string;
    label:string;
    avatar:string;
    icon:string;
    children:Well[];

    GetWells(wellDesignDTO:WellDesignDTO,
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
                    let well:Well = new Well();
                    
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

export class Well
{
    id:string;
    externalcompanyName:string;
    projectName:string;
    siteName:string;
    label:string;
    avatar:string;
    icon:string;
    children:Wellbore[]

    public GetWellbores(wellDesignDTO:WellDesignDTO,
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
                    let wellbore:Wellbore = new Wellbore();
                    
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

export class Wellbore
{
    id:string;
    projectName:string;
    externalcompanyName:string;
    siteName:string;
    wellName:string;
    label:string;
    avatar:string;
    icon:string;
    children:WellDesign[]

    public GetWellDesigns(wellDesignDTO:WellDesignDTO,
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
                    let wellDesign:WellDesign = new WellDesign();
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

export class WellDesign
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
    children:WellCase[]

    public GetWellCases(wellDesignDTO:WellDesignDTO,
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

                    let wellCase:WellCase = new WellCase();
            
                    wellCase.id = torqueDragDesigns[j].wellCaseId;
                    wellCase.externalcompanyName = torqueDragDesigns[j].externalcompanyName;
                    wellCase.projectName = torqueDragDesigns[j].projectName;
                    wellCase.siteName = torqueDragDesigns[j].siteName;
                    wellCase.wellName = torqueDragDesigns[j].wellName;
                    wellCase.wellboreName = torqueDragDesigns[j].wellboreName;
                    wellCase.wellDesignName = torqueDragDesigns[j].wellDesignName;
                    wellCase.label = torqueDragDesigns[j].designName;
                    wellCase.companyId = torqueDragDesigns[j].companyId;
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

export class WellCase
{
    id:string;
    projectName:string;
    externalcompanyName:string;
    siteName:string;
    wellName:string;
    wellboreName:string;
    wellDesignName:string;
    label:string;
    avatar:string;
    icon:string;
    designId:string;
    companyId:string;
    designName:string;
    creationDate:string;
    isSelected:boolean;

}