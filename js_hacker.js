js = {
	log:"",
	base:"/sdcard/mcpe",
	chat: false,
	load: function(file,log)
	{
	  var nl = "\n";
	  file = this.fn(file);
	  var r = new java.io.BufferedReader(new java.io.FileReader(file));
	  var expr = "";
	  while (r.ready())
	    expr += r.readLine() + nl;
	  r.close();
	  if (log)
	    js.log += expr;
	  eval(expr);
	  clientMessage("Loaded "+file);
	},
	fn: function(file)
	{
		 if (!file.startsWith("/"))
		   file = this.base+"/"+file;
		 if (!file.toLowerCase().endsWith(".js"))
		   file = file+".js";
		 return file;
	}
};

procCmd = function(command)
{
  var nl = "\n";
  var cmd =command.split(" "); 
  if (cmd.length>1 && (cmd[0]=="js" || cmd[0]=="jp" || cmd[0]=="j"))
  {
    var expr = command.substring(cmd[0].length+1, command.lenght);
    js.log += expr + nl;
    var res = eval(expr);
    if (cmd[0]=="j") 
      clientMessage("§b"+expr)
    else if (res===undefined)
    {}
    else
      clientMessage("§c"+res);
  }
  else if (cmd.length>1 && cmd[0]=="save")
  {
    var file = js.fn(cmd[1]);
    var p = new java.io.PrintStream(new java.io.FileOutputStream(file));
    if (cmd.length>2)
    {
      for (i=2; i<cmd.length; i++)
        p.println(cmd[i]+" = "+eval(cmd[i])+";");
    }
    else
    {
      p.print(js.log);
    }
    p.close()
    clientMessage("Saved "+file);
  }
  else if (cmd.length>1 && cmd[0]=="load")
  {
    for (i=1; i<cmd.length; i++)
      js.load(cmd[i],true);
  }
  else if (cmd.length==1 && cmd[0]=="reload")
  {
    js.load("/sdcard/Download/js_hacker.js",false);
  }
}