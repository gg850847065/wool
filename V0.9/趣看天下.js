//耗时30分钟，收益
launch(getPackageName("趣看天下"));
var sh = new Shell(true);
sleep(8000);
// click("跳过广告");
Tap(974,105)
sleep(2000);
id("img_close").find().click();
sleep(2000);
click("养生");
sleep(2000);
swipe(500,320,500,1450,300);
sleep(4000);
for(i=0;i<40;i++)
{
   Tap(500,380);
   for(k=0;k<8;k++)
   {
    sleep(4000);
    swipe(800,1400,800,500,500);  
   }
// 关闭彩蛋
//   Tap(950,1800);
//    sleep(1000);
//    back();
   sleep(3000);
   id("img_close").find().click();
   sleep(1000);
   back();
   //next------
   sleep(1600);
   swipe(500,320,500,1450,300);
   toastLog("计数器："+(i+1));
   sleep(3500);
   
}
sh.exec("am force-stop "+getPackageName("趣看天下"));
sleep(1000);
sh.exit;
toastLog("【趣看天下】已完成计划任务并退出APP！");
