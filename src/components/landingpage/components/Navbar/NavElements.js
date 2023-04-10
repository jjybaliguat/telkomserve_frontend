import styled from "@emotion/styled";
import { Style } from "@mui/icons-material";
import { Link } from 'react-scroll'


export const LinkS = styled(Link)`
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    font-weight: bold;
    color: rgba(255,255,255,.6);

    &:hover{
        color: #fff;
    };

    &.active{
        color: #fff;
    }
`