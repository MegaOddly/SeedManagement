create database ProjectSQL;
use ProjectSQL;

SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE Roles (
    position VARCHAR(30) NOT NULL DEFAULT '',
    PRIMARY KEY (position)
);

CREATE TABLE Users (
    userID int NOT NULL AUTO_INCREMENT,
    passcode VARCHAR(100) NOT NULL DEFAULT '',
    email VARCHAR(100) NOT NULL DEFAULT '',
    position VARCHAR(30) NOT NULL DEFAULT '',
    PRIMARY KEY (userId),
    FOREIGN KEY (position) REFERENCES Roles (position)
        -- ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE SeedsType (
    seedID int NOT NULL AUTO_INCREMENT,
    seedName VARCHAR(100) NOT NULL DEFAULT '',
    weightPerSeed VARCHAR (10) NOT NULL DEFAULT '',
    harvestTime VARCHAR (10) NOT NULL DEFAULT '',
    expirationTime VARCHAR (10) NOT NULL DEFAULT '',
    PRIMARY KEY (seedId)
);

CREATE TABLE SeedsInStock (
    batchNo int NOT NULL AUTO_INCREMENT,
    expirationDate DATE NOT NULL,
    receivedDate DATE NOT NULL,
    weight VARCHAR (100) NOT NULL DEFAULT '',
    quantity VARCHAR (100) NOT NULL DEFAULT '',
    seedID int NOT NULL,
    PRIMARY KEY (batchNo),
    FOREIGN KEY (seedID) REFERENCES SeedsType (seedID)
        -- ON DELETE SET NULL
        ON UPDATE CASCADE
);




insert into Roles(position)
values   ('Gardener'),
         ('Employee'),
         ('Administrator');
      
insert into Users(passcode, email, position) -- ids not needed since they autoincrement
values  ('Gavin' ,'gavin.jhaj@seedrepairs.com' ,'Gardener'),
        ('Anish' ,'anish.lastname@comprepairs.com' ,'Employee'),
        ('Josh' ,'josh.lol@comprepairs.com' ,'Administrator');
        
insert into SeedsType(seedName, weightPerSeed, harvestTime, expirationTime)
values    ('Pumpkin' ,'0.02' ,'69' ,'420');
        
insert into SeedsInStock(expirationDate, receivedDate, weight, quantity, seedID)
values     ('2020-8-13' ,'2020-10-20' ,'500' ,'250000' ,'1');