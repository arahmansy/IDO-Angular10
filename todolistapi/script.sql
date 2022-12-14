USE [ToDoList]
GO
/****** Object:  Table [dbo].[ToDoLists]    Script Date: 09/20/2022 01:29:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ToDoLists](
	[itemId] [int] IDENTITY(1,1) NOT NULL,
	[itemName] [nvarchar](100) NULL,
	[itemDescription] [nvarchar](100) NULL,
	[itemStatus] [nvarchar](100) NULL,
	[itemCategory] [nvarchar](100) NULL,
	[itemImportance] [nvarchar](100) NULL,
	[itemDueDate] [nvarchar](100) NULL,
	[itemEstimate] [nvarchar](100) NULL,
 CONSTRAINT [PK_ToDoLists] PRIMARY KEY CLUSTERED 
(
	[itemId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
