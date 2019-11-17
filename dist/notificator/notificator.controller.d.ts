import { NotificatorService } from './notificator.service';
import { OriginDto } from './dto/origin.dto';
export declare class NotificatorController {
    private readonly notificatorService;
    constructor(notificatorService: NotificatorService);
    callHelp(originDto: OriginDto): Promise<void>;
    callHelpHard(): Promise<void>;
    test(): Promise<void>;
}
