import React from 'react';
import {
    Box, FormControl, FormHelperText, TextField,
    TextareaAutosize, Typography, Stack, Select, MenuItem, Button, borderRadius
} from '@pankod/refine-mui';

import { FormProps } from "interfaces/common";

import CustomButton from './CustomButton';

const Form = ({ type, register, onFinish, formLoading,
    handleSubmit, propertyImage, handleImageChange, onFinishHandler }: FormProps) => {
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} a Property
            </Typography>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form style={{
                    marginTop: '20px', width: '100%', display: 'flex',
                    flexDirection: 'column', gap: '20px'
                }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    {/* Title */}
                    <FormControl>
                        <FormHelperText>Property Name</FormHelperText>
                        <TextField fullWidth required id="outlined-basic" color='info'
                            variant='outlined' {...register('title', { required: true })} />
                    </FormControl>

                    {/* Description */}
                    <FormControl>
                        <FormHelperText>Property Description</FormHelperText>
                        <TextareaAutosize minRows={5} required placeholder='write description'
                            style={{
                                width: '100%', background: 'transparent', fontSize: '16px',
                                borderColor: 'rgba(0,0,0,0.23)', borderRadius: 6, padding: 10, color: "#9191991"
                            }}
                            {...register('description', { required: true })} />
                    </FormControl>

                    <Stack direction="row" gap={4}>
                        {/* Property Type */}
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>
                                Property Type
                            </FormHelperText>
                            {/* Select */}
                            <Select displayEmpty required variant='outlined' color='info'
                                inputProps={{ "aria-label": 'without label' }} defaultValue="apartment"
                                {...register('type', { required: true })}>
                                <MenuItem value="apartment">Apartment</MenuItem>
                                <MenuItem value="villa">Villa</MenuItem>
                                <MenuItem value="farmhouse">FarmHouse</MenuItem>
                                <MenuItem value="condos">Condos</MenuItem>
                                <MenuItem value="townhouse">TownHouse</MenuItem>
                                <MenuItem value="duplex">Duplex</MenuItem>
                                <MenuItem value="studio">Studio</MenuItem>
                                <MenuItem value="chalet">Chalet</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Price */}
                        <FormControl>
                            <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>
                                Property Price
                            </FormHelperText>
                            <TextField fullWidth required id="outlined-basic" type="number" color='info'
                                variant='outlined' {...register('price', { required: true })} />
                        </FormControl>
                    </Stack>

                    {/* Location */}
                    <FormControl>
                        <FormHelperText sx={{ fontWeight: 500, margin: '10px 0', fontSize: 16, color: '#11142d' }}>
                            Enter Location
                        </FormHelperText>
                        <TextField fullWidth required id="outlined-basic" color='info'
                            variant='outlined' {...register('location', { required: true })} />
                    </FormControl>

                    {/* Photos */}
                    <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                        <Stack direction="row" gap={2}>
                            <Typography color="#11142d" fontSize={16} my="10px" fontWeight={500}>
                                Property Photos
                            </Typography>
                            <Button component="label" sx={{
                                width: 'fit-content', color: "#2ed480", textTransform: 'capitalize',
                                fontSize: 16
                            }}>
                                Upload *
                                <input hidden accept='image/*' type="file" onChange={(e) => {
                                    //@ts-ignore
                                    handleImageChange(e.target.files[0])
                                }} />
                            </Button>
                        </Stack>

                        <Typography color="#808191" fontSize={14}
                            sx={{ wordBreak: 'break-all' }}>
                            {propertyImage?.name}
                        </Typography>
                    </Stack>
                    {/* Submit Button */}
                    <CustomButton type='submit' title={formLoading ? 'Submitting...' : 'Submit'}
                        backgroundColor="#475be8" color='#fcfcfc' />

                </form>

            </Box>
        </Box>
    )
}

export default Form