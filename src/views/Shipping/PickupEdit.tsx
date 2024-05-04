import { Button, Input } from '@/components/ui';
import React from 'react';

const PickupEdit = () => {
    return (
        <div>
              <div>
                {" "}
                <div className="text-lg text-natural-900 font-semibold mb-2 dark:text-white">
                  Drop Off Address
                </div>
                <Input placeholder="Address" className="mb-4" />
              </div>

              <div>
                {" "}
                <div className="text-lg text-natural-900 font-semibold mb-2 dark:text-white">
                  Time From
                </div>
                <Input placeholder="time" className="mb-4"/>
              </div>
              <div>
                {" "}
                <div className="text-lg text-natural-900 font-semibold mb-2 dark:text-white">
                  Time To
                </div>
                <Input placeholder="time"  className="mb-4"/>
              </div>
             
              <Button
                    variant="solid"
                    type="submit"
                          >
                    Add New Address
                </Button>
            </div>
    );
};

export default PickupEdit;