
import React, { Component } from 'react'
import { tokenData } from '../eth/tokenData';

import {
    Box,
    Card,
    Image,
    Heading,
    Text
  } from 'rebass'
  
export default class SetCard extends Component {
    render() {
        return (
            <div className='set-card-container'>
                { tokenData.map(token => {
                return(
                    <Box width={256}>
                        <Card
                            sx={{
                                ':hover': {
                                    backgroundColor: '#F4F4FA',
                                    transition: '200ms',
                                    transform: 'scale(1.08)',
                                    width: 'auto'
                                  },
                            p: 1,
                            transition: '300ms',
                            borderRadius: 2,
                            boxShadow: '0 0 16px rgba(0, 0, 0, .25)',
                            height: '175px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            cursor: 'pointer'
                            }}>
                            <Image src={token.image} />
                            <Box px={2}>
                            <Heading as='h4'>
                                {token.symbol}
                            </Heading>
                            <Text fontSize={0}>
                                {token.name}
                            </Text>
                            </Box>
                        </Card>
                    </Box>
                )
                })}
            </div>
        )
    }
}

    
