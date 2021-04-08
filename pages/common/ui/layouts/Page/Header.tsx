import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import React from 'react';

import Menu from '../../lib/BaseMenu';
import MenuItem from '../../lib/BaseMenu/item';
import Button from '../../lib/BaseButton';
import { useHeaderStyles } from './styles';

interface PageHeaderProps {
    graknVersion: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({graknVersion}) => {
    const ownClasses = useHeaderStyles();

    return (
        <Container className={ownClasses.root}>
            <Grid className={ownClasses.content} container alignItems="center" justify="space-between">
                <Link to="/">
                    VATICLE
                </Link>

                <Menu
                    preventTogglerRotate
                    toggler={
                        <Button variant="text" classes={{ root: ownClasses.menuToggler }}>
                        </Button>
                    }
                >
                    <Link to="/settings">
                        <MenuItem classes={{ root: ownClasses.profileMenuItem }}>
                            <p>{graknVersion}</p>
                            <Icon icon={['fal', 'user-cog']} />
                        </MenuItem>
                    </Link>
                </Menu>

            </Grid>
        </Container>
    );
};

export default PageHeader;
