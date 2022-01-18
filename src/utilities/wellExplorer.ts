import { IWellDesignDTO, WellDesignDTO } from "src/dtos/torqueDragDesignDTO";
import { Guid } from "src/models/guid";
import { TorqueDragDesignDocument, TorqueDragDesignWithGuid,
    TorqueDragDesignWithGuidObj } from "src/models/torquedragdesign";

export interface IWellExplorer {

    torqueDragDesigns:TorqueDragDesignWithGuid[];
    wellDesignDTO:IWellDesignDTO;

    GetTorqueDragDesigns(_torqueDragDesigns:TorqueDragDesignDocument[]):void;
    GetWellCase(wellCaseId:string,
         _torqueDragDesigns:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid;
    CreateWellExplorer():void;

}

export const WellExplorer:IWellExplorer =  {

    torqueDragDesigns:[],
    wellDesignDTO:WellDesignDTO,

    GetTorqueDragDesigns(_torqueDragDesigns:TorqueDragDesignDocument[]):void
    {
        this.torqueDragDesigns = []
        let i:number = 0; const count:number = _torqueDragDesigns.length;

        for (i = 0; i < count; i++)
        {
            const row = {...TorqueDragDesignWithGuidObj} as TorqueDragDesignWithGuid;
            row.id = _torqueDragDesigns[i].id;
            row.designName = _torqueDragDesigns[i].designName;
            row.designDay = _torqueDragDesigns[i].designDay;
            row.designMonth = _torqueDragDesigns[i].designMonth;
            row.designYear = _torqueDragDesigns[i].designYear;
            row.designDate = new Date(row.designYear,row.designMonth, row.designDay);
            row.projectName = _torqueDragDesigns[i].projectName;
            row.wellName = _torqueDragDesigns[i].wellName;
            row.wellboreName = _torqueDragDesigns[i].wellboreName;
            row.wellDesignName = _torqueDragDesigns[i].wellDesignName;
            row.siteName = _torqueDragDesigns[i].siteName;
            row.externalcompanyName = _torqueDragDesigns[i].externalcompanyName;
            row.uniqueId = _torqueDragDesigns[i].uniqueId;
            row.userId = _torqueDragDesigns[i].userId;
            row.wellCaseId = Guid.NewGuid()

            this.torqueDragDesigns.push(row);
        }

    },

    GetWellCase(wellCaseId:string,
         _torqueDragDesigns:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid
    {
        return _torqueDragDesigns?.find(x => x.wellCaseId == wellCaseId);
    },

    CreateWellExplorer():void
    {
        this.wellDesignDTO = {...WellDesignDTO} as IWellDesignDTO;
        this.wellDesignDTO.projects = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.projects.includes(x.projectName) === false){return x.projectName}});

            this.wellDesignDTO.wells = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.wells.includes(x.wellName) === false){return x.wellName}});

            this.wellDesignDTO.wellbores = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.wellbores.includes(x.wellboreName) === false){return x.wellboreName}});

            this.wellDesignDTO.wellDesigns = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.wellDesigns.includes(x.wellDesignName) === false){return x.wellDesignName}});

            this.wellDesignDTO.wellCases = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.wellCases.includes(x.designName) === false){return x.designName}});

            this.wellDesignDTO.externalcompanyNames = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.externalcompanyNames.includes(x.externalcompanyName) === false){return x.externalcompanyName}});

            this.wellDesignDTO.sites = this.torqueDragDesigns.map((x:TorqueDragDesignWithGuid) => {
            if(this.wellDesignDTO.sites.includes(x.siteName) === false){return x.siteName}});

            this.wellDesignDTO.GetCompanies(this.torqueDragDesigns);
    }

}