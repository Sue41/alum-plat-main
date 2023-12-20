import React from 'react';

export default function Footer() {
    return (
        <div className='footer-wrapper'>
            <div className='footer'>
                <div className='footer-left'>
                    <h2>Contact Us</h2>
                    <form action="https://formsubmit.co/s.juma@alustudent.com" method="POST">
                        <input type='email' placeholder='Email address' />
                        <textarea placeholder='Your message'></textarea>
                        <button type='submit' className='send'>
                            Send
                        </button>
                    </form>
                </div>

                <div className='footer-right'>
                    <div className='abt-n'>Email: admin@alumplatform.com</div>
                    <div className='abt-n'> Phone: 204 309</div>
                    <div>
                        <div className='social-icons'>
                            {/* Font Awesome Icons for Facebook, Instagram, and Twitter */}
                            <a href='#' target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-facebook'></i>
                            </a>
                            <a href='#' target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-instagram'></i>
                            </a>
                            <a href='#' target='_blank' rel='noopener noreferrer'>
                                <i className='fab fa-twitter'></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div>&copy;Copyright 2023. Alumni Platform.</div>
        </div>
    );
}
