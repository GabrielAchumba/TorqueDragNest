import { Guid } from "src/models/guid";
import { TorqueDragDesignWithGuid } from "src/models/torquedragdesign";
import { IProject, Project } from "./IProject";

export interface IExternalCompany
{
    id:string;
    externalcompanyName:string;
    label:string;
    avatar:string;
    icon:string;
    children: IProject[];

    GetProjects(wellDesignDTO:any,
        torqueDragDesigns:TorqueDragDesignWithGuid[]):void;
}



export const ExternalCompany: IExternalCompany = 
{
    id: "",
    externalcompanyName: "",
    label: "",
    avatar: "",
    icon: "",
    children:[],

    GetProjects(wellDesignDTO:any,
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
                let project = {...Project} as IProject;
                
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
