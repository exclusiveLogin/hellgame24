import {Component, OnInit, Input, HostBinding} from '@angular/core';
import {Options} from 'ng5-slider';
import {UiService} from '../../../services/ui.service';
import {AuthService} from '../../../services/auth.service';
import {UserServiceService} from '../../../services/user-service.service';
import {UxEventerService} from '../../../services/ux-eventer.service';
import {enterLeaveAnimationDefault} from '../../../models/enterLeaveAnimation';
import {TopEventsService} from '../../../services/topevents.service';

@Component({
    selector: 'app-user-emo',
    templateUrl: './user-emo.component.html',
    styleUrls: ['./user-emo.component.css'],
    animations: [enterLeaveAnimationDefault]
})
export class UserEmoComponent implements OnInit {

    constructor(
        private ui: UiService,
        private auth: AuthService,
        private user: UserServiceService,
        private uxevent: UxEventerService,
        private tes: TopEventsService,
    ) {
    }

    @HostBinding('@Anima') public myStatusAnima = true;
    @Input() oldEmo: number;

    public sliderValue;
    public emo_title = '';

    public sliderOptions: Options = {
        floor: 0,
        ceil: 10,
        showTicks: true,
    };

    ngOnInit() {
        this.sliderValue = this.oldEmo || 5;
    }

    public close() {
        this.ui.closeEmoStatus();
    }

    public submitEmo() {
        const user = this.auth.authorizedUser();

        if (!user) {
            return;
        }

        const o = {
            login: user.login,
            value: this.sliderValue,
            title: this.emo_title,
        };

        this.user.setUserEmo(o).subscribe(() => {
            this.close();
            this.tes.refreshSegment('emo');
            this.uxevent.setUserEmo(user, this.sliderValue, this.emo_title);
        });

    }
}
