package fr.thor.retrosurvival;

import android.app.job.*;

public final class UpdateJob extends JobService {
 private volatile JobParameters running;
 public boolean onStartJob(JobParameters params){running=params;new Thread(()->{String tag=UpdateChecker.check(this,false);if(running==params){UpdateChecker.notifyAvailable(this,tag);jobFinished(params,false);running=null;}},"RetroUpdateDaily").start();return true;}
 public boolean onStopJob(JobParameters params){if(running==params)running=null;return true;}
}
