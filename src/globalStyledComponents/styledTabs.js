import { Tabs } from "@mantine/core";

function StyledTabs(props) {
    return (
      <Tabs
        variant="unstyled"
        styles={(theme) => ({
          tabControl: {
            backgroundColor: theme.white,
            color:  `#6F7177`,
            border: `0px`,
            width:`49px`,
            height:`33px`,
            fontSize: theme.fontSizes.md,
            padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
          },
          tabActive: {
            backgroundColor:`#4B40EE`,
            borderRadius:`5px`,
            color: theme.white,
          },
        })}
        {...props}
      />
    );
  }

  
export default StyledTabs  