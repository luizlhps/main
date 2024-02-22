import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  buttonText: string = 'Iniciar';
  twentyFiveMinutesInSeconds: number = 25 * 60;
  seconds: number = this.twentyFiveMinutesInSeconds;
  formattedSeconds: string = this.formatTime(this.seconds);
  pomodoroStart: boolean = false;
  interval: NodeJS.Timeout | undefined;

  constructor() {}

  private formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  private updateFormattedSeconds() {
    this.formattedSeconds = this.formatTime(this.seconds);
  }

  startTimeDecrease() {
    if (this.buttonText === 'Pausar') {
      console.log(this.interval);
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.buttonText = 'Iniciar';
      return;
    }

    this.pomodoroStart = true;

    this.interval = setInterval(() => {
      this.seconds--;

      if (this.seconds < 0) {
        clearInterval(this.interval);
        this.seconds = 0;
        this.buttonText = 'Iniciar';
        console.log('Timer finalizado!');
        return;
      }

      this.updateFormattedSeconds();
    }, 1000);

    this.buttonText = 'Pausar';
  }
}
