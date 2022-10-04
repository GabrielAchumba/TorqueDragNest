import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IWellDesignDTO, TorqueDragDesignDTO, WellDesignDTO } from '../dtos/torqueDragDesignDTO';
import { Sorting } from '../mathematics/sorting';
import { TorqueDragDesign, TorqueDragDesignDocument, TorqueDragDesignWithGuid,
    createUniqueId } from '../models/torquedragdesign';
import { IWellExplorer, WellExplorer } from '../utilities/wellExplorer';

@Injectable()
export class TorqueDragDesignsService {
    constructor(@InjectModel('TorqueDragDesign') private readonly torqueDragDesignModel: Model<TorqueDragDesignDocument>,) {

    }

    async getTorqueDragDesigns(): Promise<IWellDesignDTO> {
        const items = await this.torqueDragDesignModel.find().exec();
        let wellExplorer = {...WellExplorer} as IWellExplorer;
        wellExplorer.GetTorqueDragDesigns(items);
        wellExplorer.CreateWellExplorer();
        return wellExplorer.wellDesignDTO;
    }

    async postSelectedWellDesign(wellDesignDTO:any): Promise<TorqueDragDesignWithGuid> {
        
        const items:TorqueDragDesignDocument[] = [];
        let wellExplorer = {...WellExplorer} as IWellExplorer;
        wellExplorer.GetTorqueDragDesigns(items);
        const torqueDragDesignWithGuid 
        = wellExplorer.GetWellCase(wellDesignDTO.wellCaseId, wellDesignDTO.torqueDragDesigns);
        return  torqueDragDesignWithGuid;
    }

    async getWellDesignsByUserId(userId:string): Promise<IWellDesignDTO> {
        const items  = await this.torqueDragDesignModel.find({"userId":userId}).exec();
        if(items.length == 0) return {
            Companies:[],
            torqueDragDesigns:[],
            torqueDragMostRecentDesigns:[],
        } as IWellDesignDTO;
        let wellExplorer = {...WellExplorer} as IWellExplorer;
        wellExplorer.GetTorqueDragDesigns(items);
        wellExplorer.CreateWellExplorer();
        var sortedCases = Sorting.SortListofTorqueDragDesign(wellExplorer.wellDesignDTO.torqueDragDesigns);
        wellExplorer.wellDesignDTO.GetMostRecntWellCases(sortedCases);
        return wellExplorer.wellDesignDTO;
    }

    async postTorqueDragDesign(torqueDragDesignDTO:TorqueDragDesignDTO): Promise<TorqueDragDesignDTO> {
        
        let torqueDragDesignDTOX:TorqueDragDesignDTO = new TorqueDragDesignDTO();
        let torqueDragDesign = torqueDragDesignDTO.torqueDragDesign as TorqueDragDesign;
        const companyName = torqueDragDesignDTO.companyName;

        if (torqueDragDesign.designName == undefined 
            || torqueDragDesign.designName == null
            || torqueDragDesign.designName == ""
            || torqueDragDesign.wellDesignName == undefined  
            || torqueDragDesign.wellDesignName == null
            || torqueDragDesign.wellDesignName == ""
            || torqueDragDesign.wellboreName == undefined
            || torqueDragDesign.wellboreName == null
            || torqueDragDesign.wellboreName == ""
            || torqueDragDesign.wellName == undefined
            || torqueDragDesign.wellName == null
            || torqueDragDesign.wellName == ""
            || torqueDragDesign.siteName == undefined
            || torqueDragDesign.siteName == null
            || torqueDragDesign.siteName == ""
            || torqueDragDesign.projectName == undefined
            || torqueDragDesign.projectName == null
            || torqueDragDesign.projectName == ""
            || torqueDragDesign.externalcompanyName == undefined
            || torqueDragDesign.externalcompanyName == null
            || torqueDragDesign.externalcompanyName == "")
        {
            torqueDragDesignDTOX.torqueDragDesign = null;
            torqueDragDesignDTOX.info = "No well data";

            return torqueDragDesignDTOX;
        }

        torqueDragDesign = createUniqueId(torqueDragDesign);
        const updatedTorqueDragDesign = await this.torqueDragDesignModel.findOne (
            { "userId" : torqueDragDesignDTO.torqueDragDesign.userId,
            "uniqueId" : torqueDragDesignDTO.torqueDragDesign.uniqueId });

        if (updatedTorqueDragDesign != null || updatedTorqueDragDesign != undefined) 
        {
            updatedTorqueDragDesign.save();

            torqueDragDesignDTOX.torqueDragDesign = {...updatedTorqueDragDesign } as TorqueDragDesign;
            torqueDragDesignDTOX.info = "Well case already exists so the well case was updated successfully";
            return torqueDragDesignDTOX;
        }

        const newItem = new this.torqueDragDesignModel(torqueDragDesign);
        newItem.save();
        torqueDragDesignDTOX.torqueDragDesign = newItem;
        torqueDragDesignDTOX.info = "Well case created successfully";
        return torqueDragDesignDTOX;

    }


    async putTorqueDragDesign(id: string, torqueDragDesign: TorqueDragDesign): Promise<TorqueDragDesignDocument> {
        const updatedTorqueDragDesign = await this.torqueDragDesignModel.findById(id);
        if(updatedTorqueDragDesign != null || updatedTorqueDragDesign != undefined){
            Object.assign(updatedTorqueDragDesign, torqueDragDesign);
            updatedTorqueDragDesign.save();
        }

        return  updatedTorqueDragDesign;
    }

    async deleteTorqueDragDesign(id: string): Promise<TorqueDragDesignDocument> {
        const updatedTorqueDragDesign = await this.torqueDragDesignModel.findById(id);
        if(updatedTorqueDragDesign != null || updatedTorqueDragDesign != undefined){
            await this.torqueDragDesignModel.deleteOne({id}).exec();
        }

        return updatedTorqueDragDesign
        
    }
}
