import { makeAutoObservable, runInAction} from "mobx";
import { Activity } from "../../model/Activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    loadActivities = async () => {
        this.updateLoadingIndicator(true);
        try
        {
        const activities = await agent.Activities.list();
        activities.forEach(x=> {
            x.date = x.date.split('T')[0];
            this.activityRegistry.set(x.id, x);
          });
        }
        catch(error)
        {
            console.log(error);
            this.updateLoadingIndicator(false);
        }
        this.updateLoadingIndicator(false);
    
    }

    updateLoadingIndicator = (status: boolean) => {
        this.loadingInitial = status;
    }

    selectActivity= (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }

    cancelActivity = ()  => {
        this.selectedActivity = undefined;
    }

    formOpen = (id?: string) => 
    {
      id? this.selectActivity(id): this.cancelActivity();
      this.editMode = true;
    }
  
    formClose =() => 
    {
      this.editMode = false;
    }

    setEditMode = (status: boolean) => {
        this.editMode = status;
    }

    createActivity = async (activity: Activity) =>
    {
        this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            console.log('create activity');
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectActivity(activity.id);
                this.setEditMode(false);
                this.loading = false;
            })
          
            }
            catch(error)
            {
                console.log(error);
                runInAction(() => {
                    this.loading = false;
                })
                
            }
      }
      editActivity = async (activity: Activity) =>
      {
          this.loading = true;
          try{
              await agent.Activities.edit(activity);
              runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectActivity(activity.id);
                this.setEditMode(false);
                this.loading = false;
              })
          
      }
      catch(error)
      {
          console.log(error);
          runInAction(() => {
            this.loading = false;
          })
          
      }
      
    
    }
    deleteActivity = async(id: string) => {
        this.loading=true;
        try{
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
            
        }
        catch(error)
        {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}


