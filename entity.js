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

kill = function()
{
	killed = 0;
	for (i in Entity.getAll())
	{
		tId = Entity.getEntityTypeId();
		if (entity.bad.contains(tId))
		{
			Entity.remove(i);
			killed++;
		}
	}
	return killed;
}
