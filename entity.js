entity = {}
if (true)
{
	good = java.utilHashSet(["BAT","BOAT","CHICKEN","COW","EGG","FALLING_BLOCK","FIREBALL","FISHING_HOOK","ITEM","LIGHTNING_BOLT","MINECART","MUSHROOM_COW","OCELOT","PAING","PIG","PLAYER","PRIMED_TNT","RABBIT","SHEEP","SMALL_FIREBALL","SNOWBALL","THROWN_POTION","VILLAGER","WOLF"])
	entity.good = java.util.HashSet();
	entity.bad = java.util.HashSet();
	for (s in EntityType)
	{
		id = eval("EntityType."+s);
		entity[id] = s;
		if (good.contains(s))
			entity.good.add(id);
		else
			entity.bad.add(id);
	}
}

entity._kill = function(what)
{
	killed = 0;
	for (i in Entity.getAll())
	{
		tId = Entity.getEntityTypeId();
		if (what.contains(tId))
		{
			Entity.remove(i);
			killed++;
		}
	}
	return killed;
}

killBad = function() { return entity._kill(entity.bad); }
killGood = function() { return entity._kill(entity.good); }
kill = killBad;
