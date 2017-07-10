import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { CommonService } from '../../providers/common-service/common-service';

import { ContactsPage } from '../contacts/contacts';
import { ReceivePage } from '../receive/receive';
import { SendPage } from '../send/send';
import { TransactionsPage } from '../platform/stellar/transactions/transactions';
import { HomePage } from '../home/home';


@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab0Root: any = ContactsPage;
    tab1Root: any = ReceivePage;
    //tab2Root: any = WalletPage;
    tab2Root: any = HomePage;
    tab3Root: any = SendPage;
    tab4Root: any = TransactionsPage;

    mySelectedIndex: number;

    constructor(navParams: NavParams,
        private commonSvrc: CommonService) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }

}
