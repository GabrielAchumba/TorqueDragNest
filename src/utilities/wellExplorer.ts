import { WellDesignDTO } from "src/dtos/torqueDragDesignDTO";
import { Guid } from "src/models/guid";
import { TorqueDragDesignDocument, TorqueDragDesignWithGuid } from "src/models/torquedragdesign";

export class WellExplorer {

    /* public WellExplorer()
    {

    } */
    constructor(_torqueDragDesigns:TorqueDragDesignDocument[])
    {
        this.GetTorqueDragDesigns(_torqueDragDesigns);
    }

    private  torqueDragDesigns:TorqueDragDesignWithGuid[];

    public  wellDesignDTO:WellDesignDTO;

    private GetTorqueDragDesigns(_torqueDragDesigns:TorqueDragDesignDocument[]):void
    {
        this.torqueDragDesigns = []
        let i:number = 0; const count:number = _torqueDragDesigns.length;

        for (i = 0; i < count; i++)
        {
            const row:TorqueDragDesignWithGuid = new TorqueDragDesignWithGuid();
            row.id = _torqueDragDesigns[i].id,
            row.companyId = _torqueDragDesigns[i].companyId,
            row.designName = _torqueDragDesigns[i].designName,
            row.designDay = _torqueDragDesigns[i].designDay,
            row.designMonth = _torqueDragDesigns[i].designMonth,
            row.designYear = _torqueDragDesigns[i].designYear,
            row.projectName = _torqueDragDesigns[i].projectName,
            row.fieldName = _torqueDragDesigns[i].fieldName,
            row.wellName = _torqueDragDesigns[i].wellName,
            row.wellboreName = _torqueDragDesigns[i].wellboreName,
            row.wellDesignName = _torqueDragDesigns[i].wellDesignName,
            row.siteName = _torqueDragDesigns[i].siteName,
            row.externalcompanyName = _torqueDragDesigns[i].externalcompanyName,
            row.uniqueId = _torqueDragDesigns[i].uniqueId,
            row.userId = _torqueDragDesigns[i].userId,
            row.wellCaseId = Guid.NewGuid()

            this.torqueDragDesigns.push(row);
        }
    }

    public GetWellCase(wellCaseId:string, _torqueDragDesigns:TorqueDragDesignWithGuid[]):TorqueDragDesignWithGuid
    {
        return _torqueDragDesigns?.find(x => x.wellCaseId == wellCaseId);
    }

    public CreateWellExplorer():void
    {
        //if (torqueDragDesigns == null) throw new ArgumentNullException(nameof(torqueDragDesigns));
        let wellDesignDTO:WellDesignDTO = new WellDesignDTO();
        
        wellDesignDTO.projects = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.projects.includes(x.projectName) == false){return x.projectName}});

        wellDesignDTO.wells = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.wells.includes(x.wellName) == false){return x.wellName}});

        wellDesignDTO.wellbores = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.wellbores.includes(x.wellboreName) == false){return x.wellboreName}});

        wellDesignDTO.wellDesigns = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.wellDesigns.includes(x.wellDesignName) == false){return x.wellDesignName}});

        wellDesignDTO.wellCases = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.wellCases.includes(x.designName) == false){return x.designName}});

        wellDesignDTO.externalcompanyNames = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.externalcompanyNames.includes(x.externalcompanyName) == false){return x.externalcompanyName}});

        wellDesignDTO.sites = this.torqueDragDesigns.map((x) => {
            if(wellDesignDTO.sites.includes(x.siteName) == false){return x.siteName}});
        

        wellDesignDTO.GetCompanies(this.torqueDragDesigns);
    }

}