export enum GeneralEvents {
  DEBUG = "debug",
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
}

export enum DiscordEvents {
  APPLICATION_COMMAND_PERMISSIONS_UPDATE = "applicationCommandPermissionsUpdate",
  AUTO_MODERATION_ACTION_EXECUTION = "autoModerationActionExecution",
  AUTO_MODERATION_RULE_CREATE = "autoModerationRuleCreate",
  AUTO_MODERATION_RULE_DELETE = "autoModerationRuleDelete",
  AUTO_MODERATION_RULE_UPDATE = "autoModerationRuleUpdate",
  CHANNEL_CREATE = "channelCreate",
  CHANNEL_DELETE = "channelDelete",
  CHANNEL_PINS_UPDATE = "channelPinsUpdate",
  CHANNEL_UPDATE = "channelUpdate",
  EMOJI_CREATE = "emojiCreate",
  EMOJI_DELETE = "emojiDelete",
  EMOJI_UPDATE = "emojiUpdate",
  GUILD_BAN_ADD = "guildBanAdd",
  GUILD_BAN_REMOVE = "guildBanRemove",
  GUILD_CREATE = "guildCreate",
  GUILD_DELETE = "guildDelete",
  GUILD_INTEGRATIONS_UPDATE = "guildIntegrationsUpdate",
  GUILD_MEMBER_ADD = "guildMemberAdd",
  GUILD_MEMBER_AVAILABLE = "guildMemberAvailable",
  GUILD_MEMBER_REMOVE = "guildMemberRemove",
  GUILD_MEMBERS_CHUNK = "guildMembersChunk",
  GUILD_MEMBER_UPDATE = "guildMemberUpdate",
  GUILD_SCHEDULED_EVENT_CREATE = "guildScheduledEventCreate",
  GUILD_SCHEDULED_EVENT_DELETE = "guildScheduledEventDelete",
  GUILD_SCHEDULED_EVENT_UPDATE = "guildScheduledEventUpdate",
  GUILD_SCHEDULED_EVENT_USER_ADD = "guildScheduledEventUserAdd",
  GUILD_SCHEDULED_EVENT_USER_REMOVE = "guildScheduledEventUserRemove",
  GUILD_UNAVAILABLE = "guildUnavailable",
  GUILD_UPDATE = "guildUpdate",
  INTERACTION_CREATE = "interactionCreate",
  INVITE_CREATE = "inviteCreate",
  INVITE_DELETE = "inviteDelete",
  MESSAGE_CREATE = "messageCreate",
  MESSAGE_DELETE = "messageDelete",
  MESSAGE_DELETE_BULK = "messageDeleteBulk",
  MESSAGE_REACTION_ADD = "messageReactionAdd",
  MESSAGE_REACTION_REMOVE = "messageReactionRemove",
  MESSAGE_REACTION_REMOVE_ALL = "messageReactionRemoveAll",
  MESSAGE_REACTION_REMOVE_EMOJI = "messageReactionRemoveEmoji",
  MESSAGE_UPDATE = "messageUpdate",
  PRESENCE_UPDATE = "presenceUpdate",
  READY = "ready",
  ROLE_CREATE = "roleCreate",
  ROLE_DELETE = "roleDelete",
  ROLE_UPDATE = "roleUpdate",
  SHARD_DISCONNECT = "shardDisconnect",
  SHARD_ERROR = "shardError",
  SHARD_READY = "shardReady",
  SHARD_RECONNECTING = "shardReconnecting",
  SHARD_RESUME = "shardResume",
  STAGE_INSTANCE_CREATE = "stageInstanceCreate",
  STAGE_INSTANCE_DELETE = "stageInstanceDelete",
  STAGE_INSTANCE_UPDATE = "stageInstanceUpdate",
  STICKER_CREATE = "stickerCreate",
  STICKER_DELETE = "stickerDelete",
  STICKER_UPDATE = "stickerUpdate",
  THREAD_CREATE = "threadCreate",
  THREAD_DELETE = "threadDelete",
  THREAD_LIST_SYNC = "threadListSync",
  THREAD_MEMBERS_UPDATE = "threadMembersUpdate",
  THREAD_MEMBER_UPDATE = "threadMemberUpdate",
  THREAD_UPDATE = "threadUpdate",
  TYPING_START = "typingStart",
  USER_UPDATE = "userUpdate",
  VOICE_STATE_UPDATE = "voiceStateUpdate",
  WEBHOOKS_UPDATE = "webhooksUpdate",
}
