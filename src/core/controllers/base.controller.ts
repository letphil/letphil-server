import { Request, Response } from 'express';
import _ from 'lodash';
import { Model } from 'mongoose';

import logger from '../logs/logger';
import appRegistry from '../app.registry';
import appBroker from '../app.broker';

abstract class BaseController {
  // Base controller logic
  model: Model<any>;
  _: typeof _;
  logger: typeof logger;
  registry: typeof appRegistry;
  broker: typeof appBroker;
  seed?(): void;
  listeners?(): void;

  constructor(model: Model<any>) {
    this.model = model;
    this.logger = logger;
    this._ = _;
    this.registry = appRegistry;
    this.broker = appBroker;

    if (typeof this.seed === 'function') {
      this.seed();
    }

    if (typeof this.listeners === 'function') {
      this.listeners();
    }
  }

  // Generic list implementation
  async list(req: Request, res: Response) {
    try {
      // need to add pagination later
      const results = await this.model.find();

      res.status(200).json({
        data: results,
        total: results.length,
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Generic getById implementation
  async getById(req: Request, res: Response) {
    try {
      const findEntry = await this.model.findById(req.params._id);
      if (!findEntry) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }
      res.status(200).json(findEntry);
    } catch (error) {}
  }

  // Generic create implementation
  async create(req: Request, res: Response) {
    try {
      const entry = new this.model(req.body);
      res.status(201).json(await entry.save());
    } catch (error) {
      res.status(400).json({ error: error?.toString() });
    }
  }

  // Generic update implementation
  async update(req: Request, res: Response) {
    try {
      if (!req.params._id) throw new Error('No ID provided');

      const existingItem = await this.model.findById(req.params._id);
      if (!existingItem) {
        res.status(404).json({ error: 'Item not found' });
        return;
      }

      res.status(200).json(
        await this.model.findByIdAndUpdate(req.params._id, req.body, {
          new: true,
        }),
      );
    } catch (error) {
      res.status(500).json({ error: error?.toString() });
    }
  }

  // Generic delete implementation
  async delete(req: Request, res: Response) {
    try {
      this.logger.info(`Deleting item with id: ${req.params._id}`);
      if (!req.params._id) throw new Error('No ID provided');

      const removedEntry = await this.model.findByIdAndDelete(req.params._id);

      this.logger.info(`Deleted item: ${JSON.stringify(removedEntry)}`);

      res.status(200).json({
        message: 'Item deleted successfully',
        data: removedEntry,
      });
    } catch (error) {
      this.logger.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default BaseController;
