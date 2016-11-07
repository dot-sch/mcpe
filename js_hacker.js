js = {
	version: "2016-11-05",
	log: "",
	base: android.os.Environment.getExternalStorageDirectory()+"/mcpe",
	url_base: "http://raw.githubusercontent.com/dot-sch/mcpe/master",
	load: function(file, log)
	{
      try
      {
	    var nl = "\n";
        file = this.fn(file);
        var r = new java.io.BufferedReader(this.reader(file));
        var expr = "";
        while (r.ready())
          expr += r.readLine() + nl;
        r.close();
        if (log)
          js.log += expr;
        eval(expr);
        clientMessage("Loaded "+file);
	  }
	  catch (err)
	  {
		clientMessage("§c#error loading "+file+": "+err.message);
	  }
	},
	fn: function(file)
	{
      if (!file.toLowerCase().endsWith(".js"))
        file = file+".js";
      if (file.startsWith("http://"))
        return file;
      if (!file.startsWith("/"))
        file = this.base+"/"+file;
      return file;
	},
	reader: function(url_or_file)
	{
      if (url_or_file.startsWith("http://"))
        return new java.io.InputStreamReader(new java.net.URL(url_or_file).openStream());
      else
        return new java.io.FileReader(url_or_file);
	},
	outputstream: function(file)
	{
	  f = new java.io.File(file);
	  p = f.getParentFile();
	  if (!p.exists())
	    p.mkdirs();
	  return new java.io.FileOutputStream(f);  
	},
	toJS: function(obj)
	{
      funcs = [];
      repl = function(k, v) 
      {
        str = String(v);
        if (str.startsWith("[JavaClass ") || str.startsWith("[JavaPackage "))
          return str
        else if (typeof(v) === "function")
          return "#Func"+(funcs.push(v)-1)+"#";
        else 
          return v;
      }
      out = JSON.stringify(obj, repl);
      for (i=funcs.length; i-->0;)
        out = out.replace("\"#Func"+i+"#\"", funcs[i].toString().trim());
      return out;
    }
};

js.cm = js.cm ? js.cm : clientMessage;

procCmd = function(command)
{
  var nl = "\n";
  var cmd =command.split(" "); 
  if (cmd.length>1 && (cmd[0]=="js" || cmd[0]=="jp" || cmd[0]=="j"))
  {
    var expr = command.substring(cmd[0].length+1, command.lenght);
    try
    {
	  var res = eval(expr);
	  if (cmd[0]=="j") 
	    clientMessage("§b"+expr)
      else if (res===undefined)
	    clientMessage("§cundefined");
	  else
	  {
	    clientMessage("§a"+js.toJS(res));
	  }
      js.log += expr + nl;
	}
	catch (err)
	{
      clientMessage("§c#error: "+err.message); 
	}
  }
  else if (cmd.length>1 && cmd[0]=="save")
  {
    var file = js.fn(cmd[1]);
    var p = new java.io.PrintStream(js.outputstream(file));
    if (cmd.length>2)
    {
      for (j=2; j<cmd.length; j++)
      {
        try
		{
          p.println(cmd[j]+" = "+js.toJS(eval(cmd[j]))+";");
        }
        catch (err)
        {
          clientMessage("§c#error: "+err.message);
        }
      }
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
    js.load("js_hacker.js",false);
    clientMessage("version: "+js.version);
  }
  else if (cmd[0]=="dl")
  {
    sc = cmd.length==1 ? "js_hacker.js" : cmd[1];
    js.load(js.url_base+"/"+sc,false);
  }
}
