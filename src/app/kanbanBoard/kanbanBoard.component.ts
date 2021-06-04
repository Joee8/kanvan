import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  taskName: string;
  i: number;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  create(){
    this.tasks.push({ name: this.taskName, stage: 0 });
    this.configureTasksForRendering();
    this.taskName = "";
  }

  forward(taskN) {
    for (let task of this.tasks) {
      if(task.name === taskN) {
        if(task.stage == 3){
          break;
        }
        const stageId = task.stage + 1;
        task.stage = stageId;
        this.stagesTasks[stageId].push(task);
        break;
      }
    }
    this.configureTasksForRendering();
  }
  
  back(taskN) {
    for (let task of this.tasks) {
      if(task.name === taskN) {
        if(task.stage == 0){
          break;
        }
        const stageId = task.stage - 1;
        task.stage = stageId;
        this.stagesTasks[stageId].push(task);
        break;
      }
    }
    this.configureTasksForRendering();
  }

  delete(taskN) {
    this.tasks = this.tasks.filter(function(el) { return el.name != taskN; });
    this.configureTasksForRendering();
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}