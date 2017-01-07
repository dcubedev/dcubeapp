import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { ContactsPage } from '../contacts/contacts';
import { ReceivePage } from '../receive/receive';
import { SendPage } from '../send/send';
import { TransactionsPage } from '../transactions/transactions';
import { WalletPage } from '../wallet/wallet';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab0Root: any = ContactsPage;
    tab1Root: any = ReceivePage;
    tab2Root: any = WalletPage;
    tab3Root: any = SendPage;
    tab4Root: any = TransactionsPage;
    
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
