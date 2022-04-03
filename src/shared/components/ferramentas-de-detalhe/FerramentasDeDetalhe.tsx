import {
  Box,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Divider,
  Grow,
  Icon,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRef, useState } from 'react';
interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;

  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoNovo = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoVoltar = true,
  mostrarBotaoSalvarEVoltar = false,

  mostrarBotaoNovoCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,

  aoClicarEmApagar,
  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmVoltar,
  aoClicarEmSalvarEVoltar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const options = ['Salvar', 'Salvar e voltar', 'Apagar', 'Novo', 'Voltar'];
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {smDown ? (
        <Box>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
          >
            <Button /* onClick={handleClick} */>
              {options[selectedIndex]}
            </Button>
            <Button
              size="small"
              aria-controls={open ? 'split-button-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={() => setOpen(!open)}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem
                          key={option}
                          // disabled={index === 2}
                          //selected={index === 0}
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      ) : (
        <Box
          gap={1}
          marginX={1}
          padding={1}
          paddingX={2}
          display="flex"
          alignItems="center"
          height={theme.spacing(5)}
          component={Paper}
        >
          {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={aoClicarEmSalvar}
              startIcon={<Icon>save</Icon>}
            >
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Salvar
              </Typography>
            </Button>
          )}

          {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

          {mostrarBotaoSalvarEVoltar &&
            !mostrarBotaoSalvarEVoltarCarregando &&
            !smDown &&
            !mdDown && (
              <Button
                color="primary"
                variant="outlined"
                disableElevation
                onClick={aoClicarEmSalvarEVoltar}
                startIcon={<Icon>save</Icon>}
              >
                <Typography
                  variant="button"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  Salvar e voltar
                </Typography>
              </Button>
            )}

          {mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown && (
            <Skeleton width={180} height={60} />
          )}

          {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              onClick={aoClicarEmApagar}
              startIcon={<Icon>delete</Icon>}
            >
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Apagar
              </Typography>
            </Button>
          )}

          {mostrarBotaoApagarCarregando && <Skeleton width={110} height={60} />}

          {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              onClick={aoClicarEmNovo}
              startIcon={<Icon>add</Icon>}
            >
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                {textoBotaoNovo}
              </Typography>
            </Button>
          )}

          {mostrarBotaoNovoCarregando && !smDown && (
            <Skeleton width={110} height={60} />
          )}

          {mostrarBotaoVoltar &&
            (mostrarBotaoNovo ||
              mostrarBotaoApagar ||
              mostrarBotaoSalvar ||
              mostrarBotaoSalvarEVoltar) && (
              <Divider variant="middle" orientation="vertical" />
            )}

          {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
            <Button
              color="primary"
              variant="outlined"
              disableElevation
              onClick={aoClicarEmVoltar}
              startIcon={<Icon>arrow_back</Icon>}
            >
              <Typography
                variant="button"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
              >
                Voltar
              </Typography>
            </Button>
          )}

          {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={60} />}
        </Box>
      )}
    </>
  );
};
