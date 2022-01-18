export interface IWellCase
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
    companyName:string;
    designName:string;
    creationDate:string;
    isSelected:boolean;

}

export const WellCase:IWellCase = 
{
    id:"",
    projectName: "",
    externalcompanyName: "",
    siteName: "",
    wellName: "",
    wellboreName: "",
    wellDesignName: "",
    label: "",
    avatar: "",
    icon: "",
    designId: "",
    companyName: "",
    designName: "",
    creationDate: "",
    isSelected: false

}