create table cpLoginSessions
(
  userID    INT(10)     not null
    primary key,
  cpToken   VARCHAR(16) not null,
  cpSession VARCHAR(32) not null
);

create table wsConfigurationOptions
(
  name  VARCHAR(64) not null
    primary key,
  value MEDIUMTEXT(16777215) not null
);

create table wsConfigurationReactionTypes
(
  reactionTypeID INT(10) auto_increment
    primary key,
  smileyID       INT(10) not null,
  constraint smileyID
    unique (smileyID)
);

create table wsConfigurationSmileys
(
  smileyID       INT(10) auto_increment
    primary key,
  smileyName     VARCHAR(32) not null,
  smileyFileName VARCHAR(32) not null
);

create table wsConfigurationUserProfileInformation
(
  informationID          INT(10) auto_increment
    primary key,
  informationName        VARCHAR(32)  not null,
  informationDescription VARCHAR(256) not null,
  informationType        VARCHAR(16)  not null
);

create table wsFailedLogins
(
  failID    INT(10) auto_increment
    primary key,
  ipAddress VARCHAR(64) not null,
  unixtime  BIGINT(19)  not null,
  type      ENUM (12)   not null
);

create table wsGroup
(
  groupID          INT(10) auto_increment
    primary key,
  groupName        VARCHAR(32)  not null,
  groupDescription VARCHAR(256) not null,
  displayColor     VARCHAR(7)   not null,
  displayName      VARCHAR(32)  not null,
  fontColor        VARCHAR(7)   not null,
  constraint wsGroup_displayName_uindex
    unique (displayName)
);

create table wsGroupPermissions
(
  groupID    INT(10)     not null,
  permission VARCHAR(64) not null,
  primary key (groupID, permission)
);

create table wsGroupUser
(
  userID  INT(10) not null,
  groupID INT(10) not null,
  primary key (groupID, userID)
);

create table wsReactions
(
  reactionID     INT(10) auto_increment
    primary key,
  contentKey     VARCHAR(128) not null,
  reactionTypeID INT(10)      not null,
  reactorID      INT(10)      not null
);

create table wsUser
(
  userID   INT(10) auto_increment
    primary key,
  username VARCHAR(25)  not null,
  email    VARCHAR(64)  not null,
  password VARCHAR(128) null
);

create table wsUserProfile
(
  userID           INT(10)      not null
    primary key,
  registrationTime INT(10)      not null,
  birthday         INT(10)      not null,
  showBirthday     TINYINT(3)   not null,
  gender           TINYINT(3)   not null,
  location         VARCHAR(128) not null,
  aboutMe          TEXT(65535)  null,
  lastActivityTime INT(10)      not null,
  lastActivity     VARCHAR(256) not null,
  avatarChanged    INT(10)      null,
  avatarExtension  VARCHAR(8)   null
);

create table wsUserProfileComments
(
  commentID     INT(10) auto_increment
    primary key,
  userProfileID INT(10)       not null,
  userCreatorID INT(10)       not null,
  createTime    INT(10)       not null,
  message       VARCHAR(4096) not null
);

create table wsUserProfileInformation
(
  userID        INT(10)       not null,
  informationID INT(10)       not null,
  value         VARCHAR(1024) not null,
  primary key (userID, informationID)
);

create table wsUserSessions
(
  sessionID          VARCHAR(64)          not null,
  userID             INT(10)              not null,
  securityToken      VARCHAR(32)          null,
  sessionDescription VARCHAR(256)         null,
  expires            BIGINT(19)           not null,
  stay               TINYINT(3) default 0 not null,
  primary key (userID, sessionID),
  constraint wsUserSessions_clientID_uindex
    unique (securityToken)
);