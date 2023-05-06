import { Component, OnInit } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  clients: { clientId: number, latestMessage: { sender: string, message: string }, messages: any[] }[] = [];
  selectedClient: any;
  selectedClientMessages: { sender: string, message: string }[] = [];
  newMessage: string;

  constructor(private rxStompService: RxStompService) {}

  ngOnInit() {
    this.rxStompService.watch('/client-messages/').subscribe((message: Message) => {
      const clientMessage = JSON.parse(message.body);
      const existingClient = this.clients.find(client => client.clientId === clientMessage.clientId);

      if (existingClient) {
        existingClient.latestMessage = { sender: 'Client', message: clientMessage.message };
        existingClient.messages.push({ sender: 'Client', message: clientMessage.message });
      } else {
        this.clients.push({
          clientId: clientMessage.clientId,
          latestMessage: { sender: 'Client', message: clientMessage.message },
          messages: [{ sender: 'Client', message: clientMessage.message }]
        });
      }

      if (this.selectedClient && this.selectedClient.clientId === clientMessage.clientId) {
        this.selectedClientMessages.push({ sender: 'Client', message: clientMessage.message });
      }
    });
  }

  selectClient(client: any) {
    this.selectedClient = client;
    this.selectedClientMessages = [...client.messages];
  }

  sendMessage() {
    if (this.newMessage && this.selectedClient) {
      this.rxStompService.publish({ destination: `/staff-messages/${this.selectedClient.clientId}`, body: this.newMessage });
      this.selectedClientMessages.push({ sender: 'Staff', message: this.newMessage });
      this.selectedClient.latestMessage = { sender: 'Staff', message: this.newMessage };
      this.selectedClient.messages.push({ sender: 'Staff', message: this.newMessage });
      this.newMessage = '';
    }
  }
}
