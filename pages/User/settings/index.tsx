import React from 'react';
import LayoutPage from '../../common/ui/layouts/Page';
import Button from '../../common/ui/lib/BaseButton';
import { useStyles } from './styles';
import { Box } from "@material-ui/core";

const PageUserSettings: React.FC = () => {
    const ownClasses = useStyles();

    return (
        <LayoutPage classes={{ main: ownClasses.layoutMain }}>
            <Box>
                42
            </Box>
            <Box>
                www.example.com
            </Box>
            <Button classes={{ root: ownClasses.helloWorldBtn }} onClick={() => console.log("Hello World")}>
                Say 'Hello World' in console
            </Button>
        </LayoutPage>
    );
};

export default PageUserSettings;
