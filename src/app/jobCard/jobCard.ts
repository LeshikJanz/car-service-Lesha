import { XIS_JOBS2Collection } from './XIS_JOBS2Collection';
import { XIS_JOBS9Collection } from './XIS_JOBS9Collection';
import { XIS_JOBS11Collection } from './XIS_JOBS11Collection';

export class JobCard {
        public DocNum: string;
        public U_JCManager : string;
        public U_SerCons : string;
        public U_Dep: string;
        public U_CarId: string;
        public U_OwnBP: string;
        public U_OwnBPN: string;
        public U_SpnsrBP: string;
        public U_SpnsrBPN: string;
        public U_VCode: string;
        public sttsDesc: string;
        public XIS_JOBS2Collection: XIS_JOBS2Collection[];
        public XIS_JOBS9Collection: XIS_JOBS9Collection[];
        public XIS_JOBS11Collection: XIS_JOBS11Collection[];

        
}