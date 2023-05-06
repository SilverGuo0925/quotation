import { Component, OnInit, OnDestroy } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  clientId: number = Math.floor(Math.random() * 1000); // Generate a random client ID
  messages: string[] = [];
  newMessage: string = '';

  private subscription: Subscription;

  constructor(private rxStompService: RxStompService) {
    
  }

  sendMessage() {
    if (this.newMessage) {
      this.rxStompService.publish({destination: `/client-messages/`, body: JSON.stringify({ clientId: this.clientId, message: this.newMessage })});
      this.messages.push(`You: ${this.newMessage}`);
      this.newMessage = '';
    }
  }
  
  ngOnInit() {
    this.subscription = this.rxStompService.watch(`/staff-messages/${this.clientId}`).subscribe((message: Message) => {
      this.messages.push(`Staff: ${message.body}`);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
