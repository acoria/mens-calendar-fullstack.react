import { IEntity } from "../../core/api/types/IEntity";
import { OvulationSide } from "../types/OvulationSide";

export interface IStatistics extends IEntity {
    startDate: Date;
    feltOvulationSide?: OvulationSide
}
