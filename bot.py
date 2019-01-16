import discord
import asyncio
from discord.ext import commands

TOKEN = 'NTMzOTA4ODE2MzkyMjI0NzY5.DyCNKg.nPMM_lNVgkYeYDJg8Dl8ZBv4HMk'

client = commands.Bot(command_prefix = '-')

@client.event
async def on_ready():
    print('Bot if ready.')

client.run(TOKEN)