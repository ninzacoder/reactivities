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

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

    loadActivities = async () => {
        this.updateLoadingIndicator(true);
        try
        {
        const activities = await agent.Activities.list();
        activities.forEach(x=> {
          this.setActivity(x);
          });
        }
        catch(error)
        {
            console.log(error);
            this.updateLoadingIndicator(false);
        }
        this.updateLoadingIndicator(false);
    
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        console.log('test');
        console.log(activity);
        if (activity){
            this.selectedActivity = activity;
            
            console.log(activity);
            return activity;
        } else {
            this.loadingInitial = true;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                this.selectedActivity = activity;
                this.loadingInitial = false;
                })
               
                console.log(activity);
                return activity;
            }
            catch (error){
                console.log(error);
                this.loadingInitial = false;
            }
        }
        console.log(activity);
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    updateLoadingIndicator = (status: boolean) => {
        this.loadingInitial = status;
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
                this.selectedActivity = activity;
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
                this.selectedActivity = activity;
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


