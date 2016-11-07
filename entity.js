entity = {};
if (true)
{
	good = ["BAT","BOAT","CHICKEN","COW","EGG","FALLING_BLOCK","FIREBALL","FISHING_HOOK","LIGHTNING_BOLT","MINECART","MUSHROOM_COW","OCELOT","PAING","PIG","PLAYER","PRIMED_TNT","RABBIT","SHEEP","SMALL_FIREBALL","SNOWBALL","THROWN_POTION","VILLAGER","WOLF"];
	entity.good = java.util.HashSet();
	for (s in good)
	{
		id = eval("EntityType."+s);
		entity.good.add(id);
		entity[id] = s;
	}
	bad = ["BLAZE","CAVE_SPIDER","CREEPER","ENDERMAN","EXPERIENCE_ORB","EXPERIENCE_POTION","GHAST","IRON_GOLEM","ITEM","LAVA_SLIME","PIG_ZOMBIE","SILVERFISH","SKELETON","SLIME","SNOW_GOLEM","SPIDER","SQUID","ZOMBIE","ZOMBIE_VILLAGER"];
	entity.bad = java.util.HashSet();
	for (s in bad)
	{
		id = eval("EntityType."+s);
		entity.bad.add(id);
		entity[id] = s;
	}
}
