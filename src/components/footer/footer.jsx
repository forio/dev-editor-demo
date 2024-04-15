import React from 'react';
import { config } from 'epicenter-libs';
import forioLogo from 'img/forio_logo.svg';

const Footer = () => (
    <footer id="footer">
        <span>Copyright &copy; 2022 &nbsp;</span>
        <span>
            Developed in partnership with
            <a
                target="_blank"
                href={`https://forio.com/simulation_entrance?utm_source=hbp&utm_medium=footer&utm_campaign=app-${config.accountShortName}-${config.projectShortName}`}
            >
                <img
                    className="forio-logo"
                    alt="link to forio.com"
                    src={forioLogo}
                />
            </a>
        </span>
    </footer>
);

Footer.propTypes = {};

export default Footer;
