import { Injectable } from '@angular/core';

export interface IAppMenu {
    openLogin(event);
    openHome(event);
    openAbout(event);
    openRegister(event);
}

@Injectable()

export class SwitchPageService {
    appmenu: IAppMenu;
    public register(appmenu: IAppMenu) {
        this.appmenu = appmenu;
    }

    public openLogin(event) {
        if (this.appmenu) {
            this.appmenu.openLogin(event);
        }
    }

    public openHome(event) {
        if (this.appmenu) {
            this.appmenu.openHome(event);
        }
    }

    public openAbout(event) {
        if (this.appmenu) {
            this.appmenu.openAbout(event);
        }
    }

    public openRegister(event) {
        if (this.appmenu) {
            this.appmenu.openRegister(event);
        }
    }
   
}
