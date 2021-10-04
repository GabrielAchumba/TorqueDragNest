import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TorqueDragDesignDTO, WellDesignDTO } from 'src/dtos/torqueDragDesignDTO';
import { Sorting } from 'src/mathematics/sorting';
import { TorqueDragDesign, TorqueDragDesignDocument, TorqueDragDesignWithGuid } from 'src/models/torquedragdesign';
import { WellExplorer } from 'src/utilities/wellExplorer';

@Injectable()
export class TorqueDragDesignsService {
    constructor(@InjectModel('TorqueDragDesign') private readonly torqueDragDesignModel: Model<TorqueDragDesignDocument>,) {

    }

    async getTorqueDragDesigns(): Promise<WellDesignDTO> {
        const items = await this.torqueDragDesignModel.find().exec();
        let wellExplorer:WellExplorer = new WellExplorer(items);
        wellExplorer.CreateWellExplorer();
        return wellExplorer.wellDesignDTO;
    }

    async postSelectedWellDesign(wellDesignDTO:WellDesignDTO): Promise<TorqueDragDesignWithGuid> {
        
        const items:TorqueDragDesignDocument[] = [];
        let wellExplorer:WellExplorer = new WellExplorer(items);
        const torqueDragDesignWithGuid:TorqueDragDesignWithGuid 
        = wellExplorer.GetWellCase(wellDesignDTO.wellCaseId, wellDesignDTO.torqueDragDesigns);
        return  torqueDragDesignWithGuid;
    }

    async getWellDesignsByUserId(userId:string): Promise<WellDesignDTO> {
        const items  = await this.torqueDragDesignModel.find({"userId":userId}).exec();
        let wellExplorer:WellExplorer = new WellExplorer(items);
        wellExplorer.CreateWellExplorer();
        var sortedCases = Sorting.SortListofTorqueDragDesign(wellExplorer.wellDesignDTO.torqueDragDesigns);
        wellExplorer.wellDesignDTO.GetMostRecntWellCases(sortedCases);
        return wellExplorer.wellDesignDTO;
    }

    async postTorqueDragDesign(torqueDragDesignDTO:TorqueDragDesignDTO): Promise<TorqueDragDesignDTO> {
        
        let torqueDragDesignDTOX:TorqueDragDesignDTO = new TorqueDragDesignDTO();

        if (torqueDragDesignDTO.torqueDragDesign.designName == undefined 
            || torqueDragDesignDTO.torqueDragDesign.designName == null
            || torqueDragDesignDTO.torqueDragDesign.designName == ""
            || torqueDragDesignDTO.torqueDragDesign.wellDesignName == undefined  
            || torqueDragDesignDTO.torqueDragDesign.wellDesignName == null
            || torqueDragDesignDTO.torqueDragDesign.wellDesignName == ""
            || torqueDragDesignDTO.torqueDragDesign.wellboreName == undefined
            || torqueDragDesignDTO.torqueDragDesign.wellboreName == null
            || torqueDragDesignDTO.torqueDragDesign.wellboreName == ""
            || torqueDragDesignDTO.torqueDragDesign.wellName == undefined
            || torqueDragDesignDTO.torqueDragDesign.wellName == null
            || torqueDragDesignDTO.torqueDragDesign.wellName == ""
            || torqueDragDesignDTO.torqueDragDesign.siteName == undefined
            || torqueDragDesignDTO.torqueDragDesign.siteName == null
            || torqueDragDesignDTO.torqueDragDesign.siteName == ""
            || torqueDragDesignDTO.torqueDragDesign.projectName == undefined
            || torqueDragDesignDTO.torqueDragDesign.projectName == null
            || torqueDragDesignDTO.torqueDragDesign.projectName == ""
            || torqueDragDesignDTO.torqueDragDesign.externalcompanyName == undefined
            || torqueDragDesignDTO.torqueDragDesign.externalcompanyName == null
            || torqueDragDesignDTO.torqueDragDesign.externalcompanyName == "")
        {
            torqueDragDesignDTOX.torqueDragDesign = null;
            torqueDragDesignDTOX.info = "No well data";

            return torqueDragDesignDTOX;
        }


        torqueDragDesignDTO.torqueDragDesign.createUniqueId();
        const updatedTorqueDragDesign = await this.torqueDragDesignModel.findOne (
            { "userId" : torqueDragDesignDTO.torqueDragDesign.userId,
            "uniqueId" : torqueDragDesignDTO.torqueDragDesign.uniqueId });

        if (updatedTorqueDragDesign != null || updatedTorqueDragDesign != undefined) 
        {
            torqueDragDesignDTO.torqueDragDesign.id = updatedTorqueDragDesign.id;
            updatedTorqueDragDesign.save();

            torqueDragDesignDTOX.torqueDragDesign = updatedTorqueDragDesign;
            torqueDragDesignDTOX.info = "Well case already exists so the well case was updated successfully";
            return torqueDragDesignDTOX;
        }

        const newItem = new this.torqueDragDesignModel(torqueDragDesignDTO.torqueDragDesign);
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
